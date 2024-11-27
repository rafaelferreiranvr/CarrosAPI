import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from .models import Car, Photo
from .enums import Status

class CarType(DjangoObjectType):
    class Meta:
        model = Car
        fields = ('id', 'Name', 'Status', 'Photo')
    
    status_display = graphene.String()

    def resolve_status_display(self, info):
        return Status(self.Status).name

class PhotoType(DjangoObjectType):
    class Meta:
        model = Photo
        fields = ('id', 'Base64')

# Queries
class Query(graphene.ObjectType):
    cars = graphene.List(CarType)
    car = graphene.Field(CarType, id=graphene.ID(required=True))
    photos = graphene.List(PhotoType)
    photo = graphene.Field(PhotoType, id=graphene.ID(required=True))

    @login_required
    def resolve_cars(self, info):
        return Car.objects.all()

    @login_required
    def resolve_car(self, info, id):
        return Car.objects.get(pk=id)

    @login_required
    def resolve_photos(self, info):
        return Photo.objects.all()

    @login_required
    def resolve_photo(self, info, id):
        return Photo.objects.get(pk=id)

# Mutations
class CreateCar(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        status = graphene.Int(required=True)
        photo_id = graphene.ID(required=True)

    car = graphene.Field(CarType)
    
    @login_required
    def mutate(self, info, name, status, photo_id):
        photo = Photo.objects.get(pk=photo_id)
        car = Car.objects.create(
            Name=name,
            Status=status,
            Photo=photo
        )
        return CreateCar(car=car)

class UpdateCar(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        status = graphene.Int()
        photo_id = graphene.ID()

    car = graphene.Field(CarType)

    @login_required
    def mutate(self, info, id, **kwargs):
        car = Car.objects.get(pk=id)
        
        if 'name' in kwargs:
            car.Name = kwargs['name']
        if 'status' in kwargs:
            car.Status = kwargs['status']
        if 'photo_id' in kwargs:
            car.Photo = Photo.objects.get(pk=kwargs['photo_id'])
            
        car.save()
        return UpdateCar(car=car)

class DeleteCar(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @login_required
    def mutate(self, info, id):
        Car.objects.get(pk=id).delete()
        return DeleteCar(success=True)

class CreatePhoto(graphene.Mutation):
    class Arguments:
        base64 = graphene.String(required=True)

    photo = graphene.Field(PhotoType)

    @login_required
    def mutate(self, info, base64):
        photo = Photo.objects.create(Base64=base64)
        return CreatePhoto(photo=photo)

class Mutation(graphene.ObjectType):
    create_car = CreateCar.Field()
    update_car = UpdateCar.Field()
    delete_car = DeleteCar.Field()
    create_photo = CreatePhoto.Field()
