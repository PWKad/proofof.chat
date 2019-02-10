import ForceGraph3D from '3d-force-graph';
export class Details {
  graphControl;

  attached() {
    this.elem = this.graphControl;
    this.graph = ForceGraph3D()(this.elem)
      .jsonUrl('http://localhost:9001/node-graph.json')
      .nodeId('pub_key')
      .nodeColor(node => node.color)
      .nodeLabel(node => `${node.alias}`)
      .onNodeHover(node => {
        this.elem.style.cursor = node ? 'pointer' : null
      })
      .onNodeClick(node => this.router.navigate(`/#/nodes/${node.id}`));
  }
  detached() {
    // TODO clean up
  }
}
