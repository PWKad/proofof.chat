export class Invoice {
  id = '';
  description = '';
  include_address = '';
  tokens = '';
  chain_address = '';
  confirmed_at = '';
  created_at = '';
  description_hash = '';
  expires_at = '';
  is_confirmed = '';
  is_outgoing = '';
  type = '';
  request = '';
  secret = '';
  invoiceId = '';
  createdDate = '';
  createdById = '';
  status = '';
  quotedRate = '';
  originalCurrency = '';

  listing;
  listingId = '';

  constructor(data) {
    Object.assign(this, data);
  }
  setListing(listing) {
    if (!(listing instanceof Listing)) {
      listing = new Listing(listing);
    }
    this.listing = listing;
    this.listingId = listing.id;
  }
}
