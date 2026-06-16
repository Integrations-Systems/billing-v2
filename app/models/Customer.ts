export interface Customer {
    id:              string;
    organization_id: string;
    legal_name:      string;
    tax_id:          string;
    tax_system:      string;
    email:           string;
    phone:           string;
    address:         Address;
    is_active:       boolean;
    created_at:      Date;
    updated_at:      Date;
    facturapi_sync_error_detail: string,
    facturapi_sync_warning: string,
    facturapi_synced: boolean,
    message: string,
    success: true
}

export interface Address {
    street:       string;
    exterior:     string;
    interior:     string;
    neighborhood: string;
    city:         string;
    municipality: string;
    state:        string;
    country:      string;
    postal_code:  string;
}
