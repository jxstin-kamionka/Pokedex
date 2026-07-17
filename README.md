# 🔴 Pokédex

Eine schlanke, webbasierte Pokémon-Datenbank auf Basis der [PokéAPI](https://pokeapi.co/). Pokémon durchsuchen, Details wie Werte, Fähigkeiten und Entwicklungsketten ansehen – direkt im Browser, ganz ohne Framework oder Build-Tool.

## 🚀 Features

* Anzeige von Pokémon-Karten mit Nummer, Name, Bild und Typ-Icons
* Live-Suche nach Namen
* "Load More"-Pagination zum Nachladen weiterer Pokémon
* Detail-Overlay pro Pokémon mit Größe, Gewicht, Erfahrung und Fähigkeiten
* Werte-Anzeige (KP, Angriff, Verteidigung, Spezial-Angriff, Spezial-Verteidigung, Initiative) als Balkendiagramm
* Entwicklungsketten-Ansicht (1–3 Entwicklungsstufen) mit Navigation zwischen den Formen
* Vor-/Zurück-Navigation zwischen Pokémon direkt im Overlay
* Ladeanimation während des Datenabrufs

## 🛠️ Verwendete Technologien

* HTML5
* CSS3
* JavaScript (Vanilla, ES6+)
* [PokéAPI](https://pokeapi.co/) zur Datenbeschaffung

## 📁 Projektstruktur
Pokedex/
├── assets/
│   ├── fonts/       # Roboto Variable Font
│   ├── icons/       # Typ-Icons (Feuer, Wasser, Pflanze, ...) & UI-Icons
│   └── images/      # Logo & Grafiken
├── css/
│   ├── style.css    # Basis-Styles
│   ├── main.css     # Layout
│   ├── cards.css     # Pokémon-Karten
│   ├── overlay.css  # Detail-Overlay
│   └── resp.css     # Responsive Design
├── js/
│   ├── main.js       # App-Initialisierung & Ladezustand
│   ├── api.js        # Anbindung an die PokéAPI (Liste, Stats, Entwicklungsketten)
│   ├── db.js          # Zwischenspeicherung der geladenen Pokémon-Daten
│   └── template.js   # HTML-Templates für Karten, Overlay & Entwicklungsketten
└── index.html

## ⚙️ Installation

Repository klonen:
git clone https://github.com/jxstin-kamionka/Pokedex.git

🎮 Nutzung
Beim Laden der Seite werden automatisch die ersten Pokémon von der PokéAPI geladen.
Über das Suchfeld oben lässt sich gezielt nach einem Namen filtern.
Mit Load More werden weitere Pokémon nachgeladen.
Ein Klick auf eine Karte öffnet die Detailansicht mit Werten, Fähigkeiten und Entwicklungskette.
📈 Zukünftige Erweiterungen
Speichern von Favoriten
Filter nach Pokémon-Typ
Vollständige Unterstützung aller Pokémon-Typen (aktuell ohne Geist, Eis, Drache, Unlicht, Stahl)
Verbesserte Fehlerbehandlung bei nicht erreichbarer API
🤝 Feedback
Feedback, Verbesserungsvorschläge oder Ideen sind jederzeit willkommen.


