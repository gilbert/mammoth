import { Column } from './columns';
export declare class Table {
    [columnName: string]: Column<any>;
}
export declare class TableWrapper<Row, InsertRow = Row, UpdateRow = Row> {
    private readonly $name;
    private readonly $columnNames;
    private readonly $table;
    $row: Row;
    $insertRow: InsertRow;
    $updateRow: UpdateRow;
    constructor(table: Table, name: string);
    init(db: any): void;
}
