import Config from '../config';
import nodemailer from 'nodemailer';

class Etherealmail{
    private owner : any;
    private transporter;

    constructor(){
        this.owner = {
            name: Config.ETHEREAL_NAME,
            address: Config.ETHEREAL_EMAIL,
    };

    this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: Config.ETHEREAL_EMAIL,
            pass: Config.ETHEREAL_PASSWORD,
        },
    });

    }

    async sendMail(dest: string, subject: string, content: string){
        const mailOptions = {
            from: this.owner,
            to: dest,
            subject,
            html: content,
        };
        const response = await this.transporter.sendMail(mailOptions);
        return response;
    }
};
export const Ethereal = new Etherealmail();