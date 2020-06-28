import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper,Txt, Columns, Stack, Table, TextReference, PageReference } from 'pdfmake-wrapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pdf:PdfMakeWrapper;
  constructor() { 
    this.pdf=new PdfMakeWrapper();
  }

  ngOnInit(): void {
  }
  //metodo de prueba, lo pueden borrar nomas si quieren xd
  descargar(){
    /*pdf.add(
      new Txt("hello world").bold().italics().end
    );*/
    this.pdf.header(new Txt('codigo secreto').alignment('center').fontSize(50).end);
    this.pdf.footer('This is a footer');
    //pdf.pageSize('A4');
    this.pdf.pageMargins(50);
    this.pdf.add(
      new Table([
        [ 'column 1fjkfjkf', 'column 2'],
        [ 'column 1', 'column 2']
    ]).alignment('center').italics().end
    )
    this.pdf.info({
      title: 'Rotulo postulante',
      author: 'huayraDevs'
    });
    this.pdf.pageOrientation('landscape');
    this.pdf.add("nombre: hello world");
    this.pdf.add("nombre: hello world");
    
    this.pdf.add(
      new TextReference('titlePage2').end // returns the text: This is the text to be referenced
  );
   
  this.pdf.add(
      new Txt('').pageBreak('before').id('titlePage2').end
  );
   
   
    this.pdf.add(
      this.pdf.ln(2)
  );
  
  this.pdf.defaultStyle({
    bold: true,
    fontSize: 40
  });
  this.pdf.add("nombre: hello world");
    //pdf.watermark('Huayra Devs');
    this.pdf.watermark( new Txt('Huarya devs').color('blue').end );
    
    this.pdf.create().open();
  }

  descargarPDF(){
    //informacion del documento
    this.pdf.info({
      title: 'Rotulo postulante',
      author: 'huayraDevs'
    });
    
    //marca de agua
    this.pdf.watermark( new Txt('Huarya devs').end );
    //la cabecera
    this.pdf.header(new Txt('A1214Z12018').alignment('center').fontSize(30).bold().end);
    //el pie de pagina
    this.pdf.footer(new Txt('CONVOCATORIA A CONCURSO DE MÉRITOS Y PRUEBAS DE CONOCIMIENTOS PARA OPTAR A AUXILIATURAS DE DOCENCIA gestion 2020').fontSize(15).color('red').end);
    //los margenes
    this.pdf.pageMargins(50);
    //orientacion de la pagina: horizontal
    //this.pdf.pageOrientation('landscape');
    //contenido de datos personales
    this.pdf.add("nombres: jhon");
    this.pdf.add("apellidos: putito putin");
    this.pdf.add("direccion: cerro sin fin");
    this.pdf.add("telefono: 123456");
    this.pdf.add("mail: amoralarte@gmail.com");
    //salto de lineas
    this.pdf.add(
      this.pdf.ln(3)
    );
    //datos de los items
    this.pdf.add("codigo item: 2010003");
    this.pdf.add("nombre item: intro a la progra");
    this.pdf.add(
      this.pdf.ln(1)
    );
    this.pdf.add("codigo item: 20101405");
    this.pdf.add("nombre item: elementos");

    this.pdf.defaultStyle({
      bold: true,
      fontSize: 30
    });
    //abre el pdf en otra pestaña
    //this.pdf.create().open();
    //descarga el pdf
    this.pdf.create().download("mi rotulo");
  }
}
