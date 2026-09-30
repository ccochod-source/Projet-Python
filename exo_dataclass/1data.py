from dataclasses import dataclass
@dataclass
class Vecteur2D : 
    x : int = 25
    y : int = 30
    def __add__(self, autre) :
        return Vecteur2D(self.x + autre.x , self.y + autre.y)


p = Vecteur2D(35 , 45)
print (p)
print (p + Vecteur2D(13,18))

