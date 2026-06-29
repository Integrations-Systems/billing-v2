export interface Jwt {
    user_id:           string;
    email:             string;
    first_name:        string;
    last_name:         string;
    organization_id:   string;
    organization_name: string;
    organization_slug: string;
    role:              string;
    exp:               number;
    tokens:            number;
}