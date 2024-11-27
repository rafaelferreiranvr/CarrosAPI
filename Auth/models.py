from django.db import models
from rest_framework.authtoken.models import Token
from datetime import datetime, timedelta
from django.utils import timezone
from typing import Optional

class UserToken(Token):
    """
    Essa classe expande a classe Token adicionando a funcionalidade de expiração.
    
    UserTokens possuem data de validade, que é verificada todas vezes que o token é utilizado,
    e caso ele ainda seja válido, ele é retornado e sua data de validade é atualizada,
    caso contrário, ele é removido do banco de dados.

    O objetivo é desconectar usuarios caso passem um certo tempo sem entrar.
    Tokens com validade infinita oferecem riscos de segurança em casos de Session Hijacking.
    """
    expires = models.DateTimeField(null=True, blank=True)
 
    def revoke(self) -> None:
        self.delete()

    def is_expired(self) -> bool:
        """Verifica se o token expirou."""
        if self.expires is not None and self.expires < timezone.now():
            return True
        return False
    
    def get_remaining_life(self) -> timedelta:
        if self.expires is None:
            raise ValueError("O token não possui data de expiração.")
        
        remaining_life = self.expires - timezone.now()
        return remaining_life

    def set_expiration_date(self, expiration_date: datetime) -> None:
        if expiration_date is None or not isinstance(expiration_date, datetime):
            raise ValueError("A data de expiração deve ser fornecida e deve ser uma instância de datetime.")
        
        self.expires = expiration_date
        self.save()

    def refresh_lifetime(self, lifetime: timedelta) -> None:
        if lifetime is None or not isinstance(lifetime, timedelta):
            raise ValueError("O tempo de vida deve ser fornecido e deve ser uma instância de timedelta.")

        if self.expires is not None:
            self.expires += lifetime
        else:
            self.expires = timezone.now() + lifetime
        
        self.save()