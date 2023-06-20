from app.models import db, Prof, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint

def seed_profs():
    picasso = Prof(
        creator_id=randint(1, 6),
        first_name='Pablo',
        last_name='Picasso',
        field='Art'
    )
    dali = Prof(
        creator_id=randint(1, 6),
        first_name='Salvador',
        last_name='Dali',
        field='Art'
    )
    van_gogh = Prof(
        creator_id=randint(1, 6),
        first_name='Vincent',
        last_name='van Gogh',
        field='Art'
    )
    okeefe = Prof(
        creator_id=randint(1, 6),
        first_name='Georgia',
        last_name="O'Keefe",
        field='Art'
    )
    monet = Prof(
        creator_id=randint(1, 6),
        first_name='Claude',
        last_name='Monet',
        field='Art'
    )
    da_vinci = Prof(
        creator_id=randint(1, 6),
        first_name='Leonardo',
        last_name='da Vinci',
        field='Art'
    )
    rembrandt = Prof(
        creator_id=randint(1, 6),
        first_name='Rembrandt',
        last_name='van Rijn',
        field='Art'
    )

    fossey = Prof(
        creator_id=randint(1, 6),
        first_name='Dian',
        last_name='Fossey',
        field='Biology'
    )
    goodall = Prof(
        creator_id=randint(1, 6),
        first_name='Jane',
        last_name='Goodall',
        field='Biology'
    )
    darwin = Prof(
        creator_id=randint(1, 6),
        first_name='Charles',
        last_name='Darwin',
        field='Biology'
    )
    mendel = Prof(
        creator_id=randint(1, 6),
        first_name='Gregor',
        last_name='Mendel',
        field='Biology'
    )
    carson = Prof(
        creator_id=randint(1, 6),
        first_name='Rachel',
        last_name='Carson',
        field='Biology'
    )
    linnaeus = Prof(
        creator_id=randint(1, 6),
        first_name='Carl',
        last_name='Linnaeus',
        field='Biology'
    )
    pasteur = Prof(
        creator_id=randint(1, 6),
        first_name='Louis',
        last_name='Pasteur',
        field='Biology'
    )
    gould = Prof(
        creator_id=randint(1, 6),
        first_name='Stephen Jay',
        last_name='Gould',
        field='Biology'
    )
    franklin = Prof(
        creator_id=randint(1, 6),
        first_name='Rosalind',
        last_name='Franklin',
        field='Biology'
    )
    lamarck = Prof(
        creator_id=randint(1, 6),
        first_name='Jean-Baptiste',
        last_name='Lamarck',
        field='Biology'
    )
    jenner = Prof(
        creator_id=randint(1, 6),
        first_name='Edward',
        last_name='Jenner',
        field='Biology'
    )

    dalton = Prof(
        creator_id=randint(1, 6),
        first_name='John',
        last_name='Dalton',
        field='Chemistry'
    )
    lavoisier = Prof(
        creator_id=randint(1, 6),
        first_name='Antoine',
        last_name='Lavoisier',
        field='Chemistry'
    )
    mendeleev = Prof(
        creator_id=randint(1, 6),
        first_name='Dmitri',
        last_name='Mendeleev',
        field='Chemistry'
    )
    avogadro = Prof(
        creator_id=randint(1, 6),
        first_name='Amedeo',
        last_name='Avogadro',
        field='Chemistry'
    )
    nobel = Prof(
        creator_id=randint(1, 6),
        first_name='Alfred',
        last_name='Nobel',
        field='Chemistry'
    )
    rutherford = Prof(
        creator_id=randint(1, 6),
        first_name='Ernest',
        last_name='Rutherford',
        field='Chemistry'
    )
    cavendish = Prof(
        creator_id=randint(1, 6),
        first_name='Henry',
        last_name='Cavendish',
        field='Chemistry'
    )
    white = Prof(
        creator_id=randint(1, 6),
        first_name='Walter',
        last_name='White',
        field='Chemistry'
    )
    holmes = Prof(
        creator_id=randint(1, 6),
        first_name='Sherlock',
        last_name='Holmes',
        field='Chemistry'
    )

    turing = Prof(
        creator_id=randint(1, 6),
        first_name='Alan',
        last_name='Turing',
        field='Computer Science'
    )
    berners_lee = Prof(
        creator_id=randint(1, 6),
        first_name='Time',
        last_name='Berners-Lee',
        field='Computer Science'
    )
    shannon = Prof(
        creator_id=randint(1, 6),
        first_name='Claude',
        last_name='Shannon',
        field='Computer Science'
    )
    hopper = Prof(
        creator_id=randint(1, 6),
        first_name='Grace',
        last_name='Hopper',
        field='Computer Science'
    )
    lovelace = Prof(
        creator_id=randint(1, 6),
        first_name='Ada',
        last_name='Lovelace',
        field='Computer Science'
    )
    knuth = Prof(
        creator_id=randint(1, 6),
        first_name='Donald',
        last_name='Knuth',
        field='Computer Science'
    )
    dijkstra= Prof(
        creator_id=randint(1, 6),
        first_name='Edsger',
        last_name='Dijkstra',
        field='Computer Science'
    )

    marx = Prof(
        creator_id=randint(1, 6),
        first_name='Karl',
        last_name='Marx',
        field='Economics'
    )
    smith = Prof(
        creator_id=randint(1, 6),
        first_name='Adam',
        last_name='Smith',
        field='Economics'
    )
    friedman= Prof(
        creator_id=randint(1, 6),
        first_name='Milton',
        last_name='Friedman',
        field='Economics'
    )
    krugman = Prof(
        creator_id=randint(1, 6),
        first_name='Paul',
        last_name='Krugman',
        field='Economics'
    )
    keynes = Prof(
        creator_id=randint(1, 6),
        first_name='John',
        last_name='Maynard Keynes',
        field='Economics'
    )
    marshall = Prof(
        creator_id=randint(1, 6),
        first_name='Alfred',
        last_name='Marshall',
        field='Economics'
    )

    herodotus = Prof(
        creator_id=randint(1, 6),
        first_name='Herodotus',
        last_name='of Halicarnassus',
        field='History'
    )
    doris = Prof(
        creator_id=randint(1, 6),
        first_name='Doris',
        last_name='Kearns Goodwin',
        field='History'
    )
    mccullough = Prof(
        creator_id=randint(1, 6),
        first_name='David',
        last_name='McCullough',
        field='History'
    )
    william = Prof(
        creator_id=randint(1, 6),
        first_name='William',
        last_name='of Ockham',
        field='History'
    )
    zinn = Prof(
        creator_id=randint(1, 6),
        first_name='Howard',
        last_name='Zinn',
        field='History'
    )
    foote = Prof(
        creator_id=randint(1, 6),
        first_name='Shelby',
        last_name='Foote',
        field='History'
    )
    indy = Prof(
        creator_id=randint(1, 6),
        first_name='Indiana',
        last_name='Jones',
        field='History'
    )
    ross = Prof(
        creator_id=randint(1, 6),
        first_name='Ross',
        last_name='Geller',
        field='History'
    )

    shakespeare = Prof(
        creator_id=randint(1, 6),
        first_name='William',
        last_name='Shakespeare',
        field='Literature'
    )
    dickens = Prof(
        creator_id=randint(1, 6),
        first_name='Charles',
        last_name='Dickens',
        field='Literature'
    )
    woolf = Prof(
        creator_id=randint(1, 6),
        first_name='Virginia',
        last_name='Woolf',
        field='Literature'
    )
    joyce = Prof(
        creator_id=randint(1, 6),
        first_name='James',
        last_name='Joyce',
        field='Literature'
    )
    hemingway = Prof(
        creator_id=randint(1, 6),
        first_name='Ernest',
        last_name='Hemingway',
        field='Literature'
    )
    dostoevsky = Prof(
        creator_id=randint(1, 6),
        first_name='Fyodor',
        last_name='Dostoevsky',
        field='Literature'
    )
    chaucer = Prof(
        creator_id=randint(1, 6),
        first_name='Geoffrey',
        last_name='Chaucer',
        field='Literature'
    )
    thompson = Prof(
        creator_id=randint(1, 6),
        first_name='Hunter S.',
        last_name='Thompson',
        field='Literature'
    )
    burns = Prof(
        creator_id=randint(1, 6),
        first_name='Robert',
        last_name='Burns',
        field='Literature'
    )
    dickinson = Prof(
        creator_id=randint(1, 6),
        first_name='Emily',
        last_name='Dickinson',
        field='Literature'
    )
    garp = Prof(
        creator_id=randint(1, 6),
        first_name='T.S.',
        last_name='Garp',
        field='Literature'
    )
    cummings = Prof(
        creator_id=randint(1, 6),
        first_name='E.E.',
        last_name='Cummings',
        field='Literature'
    )















    newton = Prof(
        creator_id=randint(1, 6),
        first_name='Isaac',
        last_name='Newton',
        field='Physics'
    )

    all_profs = [picasso, dali, van_gogh, okeefe, monet, da_vinci, rembrandt, fossey, goodall, darwin, mendel, carson, linnaeus, pasteur, gould, franklin, lamarck, jenner, dalton, lavoisier, mendeleev, avogadro, nobel, rutherford, cavendish, white, holmes, shakespeare, marx, newton]
    [db.session.add(prof) for prof in all_profs]
    db.session.commit()
    return all_profs

def undo_profs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profs"))

    db.session.commit()
