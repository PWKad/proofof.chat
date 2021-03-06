import {NodesService} from '../../../services/nodes';
import {DataStore} from '../../../services/data-store';

export class List {

  static inject = [NodesService, DataStore];
  constructor(nodesService, dataStore) {
    this.nodesService = nodesService;
    this.dataStore = dataStore;
  }
  activate() {
    if (!this.dataStore.nodes) {
      return;
    }

    return this.nodesService.getTopNodes().then(nodes => {
      this.dataStore.addNodes(nodes);
    });
  }
}
