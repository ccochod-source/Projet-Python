class Batterie : 
    def __init__ (self, capacite) : 
        self.capacite = capacite
        

    def charge_restante(self) :
        return self.capacite 
    
class VoitureElectrique():
    def __init__ ( self, couleur , batterie ) :
        self.couleur = couleur
        self.batterie = batterie 

    def autonomie (self) :
        return self.batterie.charge_restante()

voiture = VoitureElectrique("rouge", Batterie(100))
print(voiture.autonomie())

