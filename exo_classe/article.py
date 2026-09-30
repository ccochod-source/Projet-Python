class Panier:
    def __init__(self):
        self.articles = []

    def ajouter_article(self, nom, prix):
        article = {
            "nom" : nom, 
            "prix" : prix,
        }
        self.articles.append(article)

    def total(self):
        somme = 0
        for article in self.articles :
            somme += article["prix"]
        return somme

panier = Panier()

panier.ajouter_article("Pain", 1.50)
panier.ajouter_article("Lait", 2.20)

print(panier.articles)
print (panier.total())