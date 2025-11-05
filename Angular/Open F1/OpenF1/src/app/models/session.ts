import { SessionResult } from "./session-result";
import { Driver } from "./driver";
export interface Session {
    meeting_key: number;
    session_key: number;
    location: string;
    date_start: string; // ISO 8601 datetime string
    date_end: string;   // ISO 8601 datetime string
    session_type: string;
    session_name: string;
    country_key: number;
    country_code: string;
    country_name: string;
    circuit_key: number;
    circuit_short_name: string;
    gmt_offset: string; // formato "HH:mm:ss"
    year: number;
    results: SessionResult[];
    drivers: Driver[];
}