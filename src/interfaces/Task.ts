  export interface Task {
    id:number;
    title: string;
    resources: {
      frontend: number;
      backend: number;
      qa: number;
    };
    status:string;
    description:string;
  }