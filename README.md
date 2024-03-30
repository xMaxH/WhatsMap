## Git Kommandooversikt

En grunnleggende guide til Git-kommandoer for teamsamarbeid.

### Generelle Kommandoer

- `git init`
  - Initialiserer et nytt Git-repositorium lokalt. Bruk denne i den nye prosjektmappen for å starte versjonskontroll.

- `git clone [url]`
  - Kloner et eksternt repositorium til din lokale maskin. Erstatt `[url]` med den faktiske URL-en til repositoriet.

### Branching

- `git branch`
  - Lister alle lokale branches i det nåværende repositoriet.

- `git branch [navn]`
  - Oppretter en ny branch med det spesifiserte navnet.

- `git checkout [branch-navn]`
  - Bytter til den spesifiserte branchen. Brukes for å bytte mellom ulike versjoner av koden.

- `git checkout -b [branch-navn]`
  - Oppretter en ny branch og bytter til den umiddelbart.

### Daglig Bruk

- `git status`
  - Viser statusen for det nåværende arbeidsområdet, inkludert hvilke filer som er endret eller klare for commit.

- `git add [fil]`
  - Legger til en spesifikk fil til stagingområdet, gjør den klar for å bli committet. Erstatt `[fil]` med navnet på filen du ønsker å legge til.

- `git commit -m "[beskjed]"`
  - Committ (lagrer) endringene du har gjort i stagingområdet med en tilhørende melding. Erstatt `"[beskjed]"` med en kort beskrivelse av endringene.

### Synkronisering

- `git pull [fjernnavn] [branch]`
  - Henter endringer fra den spesifiserte branchen i det eksterne repositoriet og fletter dem inn i den nåværende branchen. Vanligvis brukt som `git pull origin main`.

- `git push [fjernnavn] [branch]`
  - Sender dine committet endringer til den spesifiserte branchen i det eksterne repositoriet. For eksempel, `git push origin main` sender endringer til `main`-branchen på `origin`.

### Sammenslåing og Konflikter

- `git merge [branch-navn]`
  - Slår sammen den spesifiserte branchen inn i den nåværende branchen. Bruk dette etter at du har sikret at du er på branchen du vil merge inn i.

- `git mergetool`
  - Åpner et GUI-verktøy for å hjelpe med å løse merge-konflikter.

### Avansert Bruk

- `git rebase [branch]`
  - Flytter eller kombinerer en rekke commit-meldinger til en ny base commit. Brukes for en ren historikk, men bør brukes med forsiktighet.

### Hjelp

- `git help [kommando]`
  - Viser dokumentasjonen for en spesifikk Git-kommando. Erstatt `[kommando]` med navnet på kommandoen du søker hjelp for.
