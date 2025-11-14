export interface Meeting {
    meeting_key: string;
    circuit_key: number;
    circuit_short_name: string;
    meeting_code: string;
    location: string;
    country_key: number;
    country_name: string;
    country_code: string;
    meeting_name: string;
    meeting_official_name: string;
    gmt_offset: number;
    date_start: string; // ISO date string
    year: number;
}