import nodemailer, { Transporter } from "nodemailer"
import handlerbars from "handlebars"
import fs from "fs"

class SendMailService{
    private client: Transporter
    constructor(){
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        })
    }

    async execute(to: string, subject: string, variables: object, path: string){
        
        //variavel que irá ler o caminho passado e converte-lo para string
        const templateFileContent = fs.readFileSync(path).toString("utf8");

        //irá fazer o parse do caminho.
        const mailTemplateParse = handlerbars.compile(templateFileContent)

        //a variavel html irá receber o objeto que foi passado pelo MailController
        //com titulo de email, body e o resto.
        const html = mailTemplateParse(variables);

        //o que será enviado para o usuario.
        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com.br>"
        })

        //padrão, não sei ainda
        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}

//pra instanciar assim que a aplicação for executada
export default new SendMailService();
