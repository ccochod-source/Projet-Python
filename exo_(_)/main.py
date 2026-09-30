class Evaluation:
    def __init__(self, note):
        self._note = note

@property
def note(self):
    return self._note

@note.setter
def note(self, valeur):
    if valeur < 0 and valeur > 20:
        raise ValueError("...")
        self._note = valeur


def mention(self):
    return "Admis" if self.note >= 10 else "Ajouté"