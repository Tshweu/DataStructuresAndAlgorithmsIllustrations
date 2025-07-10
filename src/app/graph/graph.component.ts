import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataSet, Edge, Network } from 'vis-network/standalone';

type Alert = {
  title: string;
  message: string;
  visible: boolean;
};

const edge = {
  color: '#848484',
  highlight: '#848484',
  hover: '#848484',
  inherit: 'from',
  opacity: 1.0,
};

const nodeConfig = {
  color: '#cc6699',
  shape: 'box',
  size: 20,
};

@Component({
  selector: 'app-graph',
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent {
  @ViewChild('networkContainer') networkContainer!: ElementRef;
  private network: Network | undefined;

  alert: Alert = {
    title: '',
    message: '',
    visible: false,
  };

      nodes = new DataSet([
      { id: 1, label: 'Node 1', shape: 'circle' },
      {
        id: 2,
        label: 'Node 2',
        shape: 'circle',
      },
      { id: 3, label: 'Node 3', shape: 'circle' },
      {
        id: 4,
        label: 'Node 4',
        shape: 'circle',
      },
      {
        id: 5,
        label: 'Node 5',
        shape: 'circle',
      },
      {
        id: 6,
        label: 'Node 6',
        shape: 'circle',
      },
    ]);

    edges: Edge[] = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 6 },
      { from: 3, to: 4 },
      { from: 5, to: 4 },
    ];

  constructor() {
    for (let i = 0; i < 5; i++) {
      // this.addNode('i');
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.


    const data = { nodes: this.nodes, edges: this.edges };

    const options = {
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: false,
          levelSeparation: 150,
          nodeSpacing: 200,
          treeSpacing: 200,
          blockShifting: false,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'UD', // UD, DU, LR, RL
          sortMethod: 'directed', // hubsize, directed
          shakeTowards: 'leaves', // roots, leaves
        },
      },
      edges: {
        shadow: true,
      },
      nodes: {
        shadow: true,
      },
      interaction: {
        hover: true,
        dragNodes: false,
        dragView: false,
        keyboard: false,
        zoomView: false, // Disable zoom
      },
      physics: { enabled: true },
    };

    this.network = new Network(
      this.networkContainer.nativeElement,
      data,
      options
    );

    const tabElement = document.querySelector('#illustration-tab');
    tabElement?.addEventListener('shown.bs.tab', () => {
      setTimeout(() => {
        this.network!.fit({ animation: true });
      }, 100);
    });
  }

  dfs() {
    //setup
    let graph : any[][] = [];
    let seen : {} = {};

    this.nodes.forEach(node => {
      let arr = this.edges.filter(e=> e.from === node.id);
      console.log(arr);
      graph.push([...arr]);
      console.table(graph);
    });

  }

  async search(g: any,index: number, seen: any, cur: Object){
    if(!seen.hasOwnProperty(index)){
      seen.index = index;
    }
    let v = this.search(g,index,seen,cur);

    //update ui
    await new Promise((resolve)=>{
      setTimeout(resolve,1000);
    })

  }
}
