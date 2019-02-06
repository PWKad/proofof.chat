const db = require('../config/db');
const Invoice = db.Invoice;
const invoicesService = require('@coinmesh/lnd-adapter').invoicesService;

module.exports = {
  getAll,
  getById,
  getByInvoiceId,
  getByListing,
  create,
  checkForUpdates,
  update
};

async function getAll() {
  let dbInvoices = await Invoice.find().select('-hash');

  return await updateDbInvoices(dbInvoices);
}

async function getById(id) {
  let invoice = await Invoice.findById(id);

  const updatedInvoices = await updateDbInvoices([invoice]);

  return updatedInvoices[0];
}

async function getByInvoiceId(id) {
  return await Invoice.findOne({invoiceId: id});
}

async function getByListing(listing) {
  let dbInvoices = await Invoice.find({listing: listing}).select('-hash');

  return await updateDbInvoices(dbInvoices);
}

async function updateDbInvoices(dbInvoices) {
  const result = await invoicesService.getInvoices();
  const invoices = result.invoices;

  let finalInvoices = [];
  let promises = [];

  invoices.forEach(invoice => {
    const match = dbInvoices.find(dbInvoice => dbInvoice.invoiceId.toString() === invoice.id.toString());

    const promise = checkForUpdates(match, invoice)
      .then(updatedInvoice => {
        if (updatedInvoice) {
          finalInvoices.push(updatedInvoice)
        }
      });

    promises.push(promise);
  });

  await Promise.all(promises);

  return finalInvoices;
}

async function checkForUpdates(match, invoice) {
  if (!match) {
    console.log('no match, should create instead')
    console.log(invoice)
    return Promise.resolve();
  }
  console.log('checking for updates')
  console.log(match)
  console.log(invoice)
  console.log(invoice.is_confirmed)

  let updates = {};

  if (invoice.is_confirmed !== match.is_confirmed) {
    updates.is_confirmed = true;
  }

  if (match.status !== 'paid' && invoice.is_confirmed) {
     updates.status = 'paid';
  }

  if (Object.keys(updates).length > 0) {
    const updatedInvoice = Object.assign(match, updates);
    return update(updatedInvoice.id, updatedInvoice);
  } else {
    return Promise.resolve(match);
  }
}

async function create(invoiceParam) {
  const {
    description,
    tokens,
    internalDescription,
    listing,
    createdById,
    originalCurrency,
    quotedRate
  } = invoiceParam;

  const lndInvoiceRequest = {
    description,
    tokens,
    internalDescription
  };

  let result = await invoicesService.createInvoice(lndInvoiceRequest);

  result.listing = listing;
  result.quotedRate = quotedRate;
  result.originalCurrency = originalCurrency;
  result.createdById = createdById;
  result.invoiceId = result.id;
  result.status = 'created';

  delete result.id;

  const invoice = new Invoice(result);

  await invoice.save();

  return invoice;
}

async function update(id, invoiceParam) {
  const invoice = await Invoice.findById(id);

  if (!invoice) throw 'Invoice not found';

  Object.assign(invoice, invoiceParam);

  await invoice.save();

  return invoice;
}
