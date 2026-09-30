class Employe:
    def __init__(self,nom,salaire):
        self.nom = nom
        self.salaire = salaire


    def fiche_paie(self):
        return (self.nom , self.salaire) 
    
class Manager(Employe):
    def __init__(self, nom , salaire , equipe,):
        super().__init__ (nom , salaire)
        self.equipe = equipe

    def fiche_paie(self):
        base = super().fiche_paie()
        prime = self.salaire*0,1
        return f"{base} + prime {prime}€"

m = Manager("Alice" , 3000 , ["Bob"])
print(m.fiche_paie())        
    

