
def total_stock_par_categorie(produits):
    stock_par_categorie = {}
    for produit in produits:
        categorie = produit["categorie"]
        stock = produit["stock"]
        if categorie in stock_par_categorie:
            stock_par_categorie[categorie] += stock
        else:
            stock_par_categorie[categorie] = stock
    return stock_par_categorie


produits = [{"nom": "pomme", "categorie": "fruit", "stock": 10}, 
{"nom": "banane", "categorie": "frigo", "stock": 20},
{"nom": "orange", "categorie": "fruit", "stock": 30}]
print(total_stock_par_categorie(produits))

def notes_maximales(eleves):
    notes_maximales = {}
    for eleve in classe : 
        notes_maximales[eleve["nom"]] = eleve["notes"]
        if len(notes_maximales) == 0 :
            notes_maximales = 0
        else :
            notes_maximales = max(notes_maximales)
    return notes_maximales


classe = [{"nom": "eleve1", "notes": [15,12,13]},{"nom": "eleve2", "notes": [10 , 12 , 20]}]
print = (notes_maximales(notes_maximales))