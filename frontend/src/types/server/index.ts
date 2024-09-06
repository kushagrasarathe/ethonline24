export interface SSVOperator {
  id?: number;
  id_str?: string;
  declared_fee?: string;
  previous_fee?: string;
  fee?: string;
  public_key: string; // Required field
  owner_address?: string;
  address_whitelist?: string;
  is_private?: boolean;
  whitelisting_contract?: string;
  location?: string;
  setup_provider?: string;
  eth1_node_client?: string;
  eth2_node_client?: string;
  mev_relays?: string;
  description?: string;
  website_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  dkg_address?: string;
  logo?: string;
  type?: string;
  name?: string;
  performance?: Performance;
  is_valid?: boolean;
  is_deleted?: boolean;
  is_active?: number;
  status?: string;
  validators_count?: number;
  version?: string;
  network?: string;
}

export interface Performance {
  "24h"?: number;
  "30d"?: number;
}

export interface Pagination {
  total?: number;
  pages?: number;
  per_page?: number;
  page?: number;
  current_first?: number;
  current_last?: number;
}

export interface SSVOperatorsData {
  operators?: SSVOperator[];
  pagination?: Pagination;
}
