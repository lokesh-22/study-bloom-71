import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
// ...existing code...
import { dummyGraphData } from "@/data/dummy-data";
import { Network, Zap, Shuffle, RotateCcw } from "lucide-react";

const Graph = () => {
  // Convert dummy data to ReactFlow format
  const initialNodes: Node[] = dummyGraphData.nodes.map(node => ({
    id: node.id,
    position: { x: node.x, y: node.y },
    data: { 
      label: node.label,
    },
    type: 'default',
    style: {
      background: getNodeColor(node.type),
      color: 'white',
      border: '2px solid transparent',
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '500',
    },
  }));

  const initialEdges: Edge[] = dummyGraphData.edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'default',
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    animated: true,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  function getNodeColor(type: string) {
    switch (type) {
      case 'framework':
        return 'hsl(var(--primary))';
      case 'concept':
        return 'hsl(var(--success))';
      case 'field':
        return 'hsl(var(--warning))';
      case 'algorithm':
        return 'hsl(var(--destructive))';
      default:
        return 'hsl(var(--muted-foreground))';
    }
  }

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleShuffle = () => {
    const shuffledNodes = nodes.map(node => ({
      ...node,
      position: {
        x: Math.random() * 400 + 50,
        y: Math.random() * 400 + 50,
      },
    }));
    setNodes(shuffledNodes);
  };

  const handleReset = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNode(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div>
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Knowledge Graph</h1>
            <p className="text-muted-foreground">
              Explore the connections between concepts in your study materials.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              variant="outline"
              onClick={handleShuffle}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle Layout
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset View
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Graph Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-3"
            >
              <Card className="h-96 lg:h-[600px] overflow-hidden">
                <CardContent className="p-0 h-full">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    fitView
                    className="bg-muted/30"
                  >
                    <Controls className="bg-card border border-border rounded-lg" />
                    <MiniMap 
                      className="bg-card border border-border rounded-lg"
                      nodeColor={(node) => getNodeColor(node.data?.type || 'default')}
                    />
                    <Background 
                      variant={BackgroundVariant.Dots} 
                      gap={20} 
                      size={1} 
                      color="hsl(var(--border))"
                    />
                  </ReactFlow>
                </CardContent>
              </Card>
            </motion.div>

            {/* Side Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Legend */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Network className="w-5 h-5 mr-2" />
                    Legend
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: getNodeColor('framework') }}
                    />
                    <span className="text-sm">Framework</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: getNodeColor('concept') }}
                    />
                    <span className="text-sm">Concept</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: getNodeColor('field') }}
                    />
                    <span className="text-sm">Field</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: getNodeColor('algorithm') }}
                    />
                    <span className="text-sm">Algorithm</span>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Node Info */}
              {selectedNode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Node Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-medium text-lg">{selectedNode.data.label}</h3>
                          <Badge 
                            className="mt-1"
                            style={{ 
                              backgroundColor: getNodeColor(selectedNode.data.type),
                              color: 'white'
                            }}
                          >
                            {selectedNode.data.type}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <p><strong>Node ID:</strong> {selectedNode.id}</p>
                          <p><strong>Connections:</strong> {
                            edges.filter(edge => 
                              edge.source === selectedNode.id || edge.target === selectedNode.id
                            ).length
                          }</p>
                        </div>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setSelectedNode(null)}
                        >
                          Close Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Graph Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Graph Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Nodes:</span>
                    <span className="font-medium">{nodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Connections:</span>
                    <span className="font-medium">{edges.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Concepts:</span>
                    <span className="font-medium">
                      {nodes.filter(node => node.data.type === 'concept').length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Generate New Connections
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Export Graph
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;