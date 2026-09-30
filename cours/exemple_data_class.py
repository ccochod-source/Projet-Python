class Point : 
    def __init__(self, x , y)
    self.x = x
    self.y = y

    def __repr__(self):
        return f"Point(x={self.x}, y={self=;y})"


    def __eq__ (self,autre) : 
        return (self.x , self.y) == (autre.x, autre.y)





from dataclasses import  dataclass 
@dataclass
class Point : 
    x : float
    y : float 

p = Point(1,2)
print p 
print (p == Point(1,2))






@dataclass
class Carte : 
    nom : str 
    pv : int = 50

a = Carte ("Pikachu" , 35)
b = Carte ("Pikachu" , 35)

print(a)

print(a == b)

print(Carte("Rondoudou"))


@dataclass(frozen=True)
class Transaction : 
    montant : float
    categorie : str 

t = Transaction (12.5, "café")
t.montant = 20
#frozeninstanceerror : cannot assign to field

vues = {t, Transaction(12.5, "café")}
print (len(vues))