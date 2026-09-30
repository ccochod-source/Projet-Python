class Commande : 
    def __init__(self,montant): 
        self.montant = montant

    def total(self):
        return self.montant

class CommandeVip(Commande):
    def __init__(self,remise,frais_livraison,montant):
        super().__init__(montant)
        self.remise = remise
        self.frais_livraison = frais_livraison
        

    def total(self):
        base = super().total() 
        return base - self.remise + self.frais_livraison

cmd = CommandeVip(100, 30 , 20)
print (cmd.total())

