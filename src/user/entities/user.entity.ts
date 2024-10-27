import { USERROLE } from "src/Enum/enum";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    // Utilisez un type date ou number en fonction du besoin
 

    // Vérifiez que USERROLE est bien un enum dans votre code
    @Column({
      type: 'enum',
      enum: USERROLE
    })
    role: USERROLE;

    @Column()
    photo: string;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date; // @CreateDateColumn remplit ce champ automatiquement lors de la création
}
