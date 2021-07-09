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
  // 参数
  params?: Prop[];
  // {name: string, age: number}
  return?: string;
}

export interface Slot {
  name: string;
  desc: string;
  params?: string[];
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
  methods?: {
    h3: string;
    table: {
      headers: string[];
      rows: Method.key[];
    };
  };
  slots?: {
    h3: string;
    table: {
      headers: string[];
      rows: Slot.key[];
    };
  };
}

// 组件信息
export interface Component {
  name: string;
  emits?: Emit[];
  props?: Prop[];
  methods?: Method[];
  slots?: Slot[];
}
