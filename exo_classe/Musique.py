class Playlist:
    def __init__(self):
        self.morceaux = []
       
    
    def ajouter_titre(self, nom, duree):
        titre = {
           "nom" : nom,
           "duree" : duree
        }
        self.morceaux.append(titre)

    def duree_totale(self) :
        duree_totale = 0 
        for titre in self.morceaux :
            duree_totale += titre["duree"]
        return duree_totale
    
playlist = Playlist()

playlist.ajouter_titre("Changer" , 2.00 )
playlist.ajouter_titre("Sublimanal" , 3.00)

print(playlist.morceaux)
print(playlist.duree_totale())
