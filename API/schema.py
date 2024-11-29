import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from .models import Car
from .enums import Status

class StatusEnum(graphene.Enum):
    INDISPONIVEL = 0
    DISPONIVEL = 1

    @property
    def description(self):
        if self == StatusEnum.INDISPONIVEL:
            return "Indisponível"
        return "Disponível"

class CarType(DjangoObjectType):
    Status = StatusEnum()

    class Meta:
        model = Car
        fields = ('id', 'Name')

    def resolve_Status(self, info):
        return self.Status

class Query(graphene.ObjectType):
    search_cars = graphene.List(
        CarType,
        name=graphene.String(required=True),
        description="Search cars by name"
    )

    @login_required
    def resolve_search_cars(self, info, name):
        return Car.objects.filter(Name__icontains=name)

schema = graphene.Schema(query=Query)