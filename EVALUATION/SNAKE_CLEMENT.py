import random


TAILLE_GRILLE = 15


def creer_pomme(serpent):
    pomme = [
        random.randint(0, TAILLE_GRILLE - 1),
        random.randint(0, TAILLE_GRILLE - 1),
    ]

    while pomme in serpent:
        pomme = [
            random.randint(0, TAILLE_GRILLE - 1),
            random.randint(0, TAILLE_GRILLE - 1),
        ]

    return pomme


def afficher_grille(serpent, pomme, score):
    # Les lignes vides permettent de mieux voir la nouvelle grille.
    print("\n" * 20)
    print("SNAKE - Score :", score)
    print("+" + "-" * TAILLE_GRILLE + "+")

    for ligne in range(TAILLE_GRILLE):
        ligne_affichee = "|"

        for colonne in range(TAILLE_GRILLE):
            position = [ligne, colonne]

            if position == serpent[0]:
                ligne_affichee += "O"
            elif position in serpent:
                ligne_affichee += "o"
            elif position == pomme:
                ligne_affichee += "@"
            else:
                ligne_affichee += " "

        ligne_affichee += "|"
        print(ligne_affichee)

    print("+" + "-" * TAILLE_GRILLE + "+")
    print("Z = haut, S = bas, Q = gauche, D = droite")


def choisir_direction(direction):
    commande = input("Direction : ").lower()

    # Le serpent ne peut pas repartir directement en arriere.
    if commande == "z" and direction != "s":
        return "z"
    elif commande == "s" and direction != "z":
        return "s"
    elif commande == "q" and direction != "d":
        return "q"
    elif commande == "d" and direction != "q":
        return "d"

    return direction


def deplacer_serpent(serpent, direction):
    tete = serpent[0]
    nouvelle_tete = [tete[0], tete[1]]

    if direction == "z":
        nouvelle_tete[0] -= 1
    elif direction == "s":
        nouvelle_tete[0] += 1
    elif direction == "q":
        nouvelle_tete[1] -= 1
    elif direction == "d":
        nouvelle_tete[1] += 1

    return nouvelle_tete


def jouer():
    serpent = [[7, 7], [7, 6], [7, 5]]
    direction = "d"
    pomme = creer_pomme(serpent)
    score = 0
    jeu_en_cours = True

    while jeu_en_cours:
        afficher_grille(serpent, pomme, score)
        direction = choisir_direction(direction)
        nouvelle_tete = deplacer_serpent(serpent, direction)

        sortie_grille = (
            nouvelle_tete[0] < 0
            or nouvelle_tete[0] >= TAILLE_GRILLE
            or nouvelle_tete[1] < 0
            or nouvelle_tete[1] >= TAILLE_GRILLE
        )

        collision_serpent = nouvelle_tete in serpent

        if sortie_grille or collision_serpent:
            jeu_en_cours = False
        else:
            serpent.insert(0, nouvelle_tete)

            if nouvelle_tete == pomme:
                score += 1
                pomme = creer_pomme(serpent)
            else:
                serpent.pop()

    afficher_grille(serpent, pomme, score)
    print("Partie terminee !")
    print("Score final :", score)


if __name__ == "__main__":
    jouer()
