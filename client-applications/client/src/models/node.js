export class Node {
  id = '';
  pub_key = '';
  alias = '';
  capacity = '';
  channel_count = '';
  color = '';
  sockets = [];
  addresses = [];
  updated_at = '';
  messageCount = 0;
  createdDate = 0;

  constructor(data) {
    Object.assign(this, data);
  }
  merge(message) {
    Object.assign(this, message);
  }
}
