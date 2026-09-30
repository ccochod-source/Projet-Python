class Moteur:
    def __init__(self, cylindre):
        self.cylindre = cylindre
    def demarrer(self):
        return("RATATATTATATATTATTATA")

class Kart:
    def __init__(self, marque, moteur):
        self.marque = marque
        self.moteur = moteur
    def demarrer(self):
        return self.moteur.demarrer()

