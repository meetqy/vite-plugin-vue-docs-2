// 事件
interface Emit {
  name: string;
  notes?: string;
}

// 参数
export interface Prop {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  notes?: string;
}

// ref 可调用方法
export interface Method {
  name: string;
  // 描述
  desc: string;
  params: Prop[];
  // {name: string, age: number}
  return: string;
}

export interface RenderData {
  name: string;
  props?: {
    h3: string;
    table: {
      headers: string[];
      rows: Prop.key[];
    };
  };
  emits?: {
    h3: string;
    table: {
      headers: string[];
      rows: Emit.key[];
    };
  };
}
