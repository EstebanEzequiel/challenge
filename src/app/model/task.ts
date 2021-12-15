export interface Task {
    id: number;
    producto: string;
	tipo: string;
	titulo: string; 
	fecha: Date;
	estado?: string;
    activo: boolean;
}
