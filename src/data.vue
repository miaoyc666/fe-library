<script>

export const graphData = {
  nodes: [
    {
      id: "0",
      data: {
        departure_count: "6",
        total_count: "50",
        name: "一级部门",
        position: "Chief Executive Officer",
        status: "online"
      }
    },
    {
      id: "1",
      data: {
        departure_count: "1",
        total_count: "6",
        name: "二级部门",
        position: "Chief Executive Assistant",
        status: "busy"
      }
    },
    {
      id: "2",
      data: {
        departure_count: "0",
        total_count: "1",
        name: "小组1",
        position: "Senior Executive Assistant",
        status: "offline"
      }
    },
    {
      id: "4",
      data: {
        departure_count: "0",
        total_count: "5",
        name: "小组2",
        position: "Finance Manager",
        status: "busy"
      }
    },
  ],
  edges: [
    {
      id: 'edge-1',
      source: "0",
      target: "1"
    },
    {
      id: 'edge-2',
      source: "1",
      target: "2"
    },
    {
      id: 'edge-3',
      source: "1",
      target: "4"
    },
  ]
}

</script>
