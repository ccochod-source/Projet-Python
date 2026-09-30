class Vehicule:
    def __init__(self, marque, v_max):
        self.marque = marque
        self.v_max = v_max

class Voiture(Vehicule):
    def __init__(self, marque, v_max, nb_portes):
        super().__init__(marque, v_max)
        self.nb_portes = nb_portes

v = Voiture("Renault", 200, 4)
print(isinstance(v, Vehicule))