import { Country } from "./country";

export interface Municipality {
    idMunicipality?: number;
    municipalityName?: string;
    idCountry?: Country;
}