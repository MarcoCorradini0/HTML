export interface SessionResult {
  position: number;          // Posizione finale del pilota
  driver_number: number;     // Numero del pilota
  number_of_laps: number;    // Numero di giri completati
  dnf: boolean;              // Did Not Finish
  dns: boolean;              // Did Not Start
  dsq: boolean;              // Squalificato
  duration: number;          // Durata in minuti o secondi (secondo la tua unità)
  gap_to_leader: number;     // Gap rispetto al leader
  meeting_key: number;       // Chiave della gara
  session_key: number;       // Chiave della sessione
}
