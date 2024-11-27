from enum import IntEnum

class Status(IntEnum):
    
    INDISPONIVEL = 0
    DISPONIVEL = 1
    
    @classmethod
    def choices(cls):
        return [(status.value, status.name) for status in cls]
