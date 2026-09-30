def ajouter_livre(produits, livre):
    produits.append(livre)
    return produits


def retirer_livre(produits, nom):
    for livre in produits:
        if livre["nom"].lower == nom.lower :
            produits.remove(livre)
            return True

    return False
    