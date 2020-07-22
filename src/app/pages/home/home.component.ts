import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper,Txt, Columns, Stack, Table, TextReference, PageReference, Img } from 'pdfmake-wrapper';
import * as pdfMaker from 'pdfmake';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HabilitacionService } from 'src/app/servicios/habilitacionPostulantes/habilitacion.service';
import { Usuario } from 'src/app/models/clases/comision/usuario';

declare var tata: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  pdf:PdfMakeWrapper;
  constructor(private router: Router,private habilitacion:HabilitacionService) { 
    this.pdf=new PdfMakeWrapper();
  }

  ngOnInit(): void {
  }

  guardar(form: NgForm) {
    this.form = form;
    if (form.invalid) {
      Object.values(form.controls).forEach(
        control => {
          control.markAllAsTouched();
        }
      );
      tata.error('Error', 'Ingrese su código de rótulo por favor');
    } else {
      /*if(form.controls['codigo'].value === '12345'){
      tata.success('Exito', 'Ingreso exitoso');
      this.router.navigate(['/evaluacion__requisitos_postulante']);
      $('#modalEvaluador').modal('hide');
      }else{
      tata.error('Error', 'Codigo Incorrecto');
      }*/
      this.getUsuarioBD(parseInt(form.controls['codigo'].value));
      
    }
  }
  getUsuarioBD(idUsuario:number){
    this.habilitacion.getUsuario(idUsuario).subscribe(
      (resp:any)=>{
        let usuario:Usuario=new Usuario(resp.idUsuario,
                                        resp.nombre,
                                        resp.apellidoP,
                                        resp.apellidoM,
                                        resp.correo);
        //console.log(JSON.stringify(usuario));
        localStorage.setItem("usuario",JSON.stringify(usuario));
        this.router.navigate(['/evaluacion__requisitos_postulante']);
        $('#modalEvaluador').modal('hide');
      }
      )
    
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
    bold: false,
    fontSize: 20
  });
  this.pdf.add("nombre: hello world");
    //pdf.watermark('Huayra Devs');
    this.pdf.watermark( { text: 'test watermark', color: 'blue', opacity: 0.3, bold: true, italics: false } );
    
    this.pdf.create().open();
  }

  descargarPDF(){
    this.pdf.info({
      title: 'Rotulo postulante',
      author: 'huayraDevs'
    });
    //marca de agua
    this.pdf.watermark({ text: 'Universidad Mayor de San Simón', color: '#f2f2f2', opacity: 0.5, bold: false, italics: false } );

    //la cabecera
    this.pdf.add(new Txt('TITULO DE LA CONVOCATORIA y GESTION').alignment('center').fontSize(20).bold().end);
    this.pdf.add(
      this.pdf.ln(2)
    );
    //el pie de pagina
    this.pdf.footer(new Txt('Documento sin validez legal').fontSize(15).color('#f2f2f2').opacity(0.8).alignment('center').end);
  
    this.pdf.add(
      new Table([
        [ {text: 'Nombres1:', fontSize: 18, bold: true}, {text: 'Juan1', fontSize: 18, bold: false}],
        [ 'column 1', 'column 2']
    ]).alignment('center').italics().layout('noBorders').end
    );

    var dato = new Table([
      [ {text: 'Nombres:', fontSize: 18, bold: true}, {text: 'Juan', fontSize: 18, bold: false}]
  ]).widths([ 100, '*' ]).layout('noBorders').end;
  this.pdf.add(dato)
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
      fontSize: 20
    });
    //abre el pdf en otra pestaña
    //this.pdf.create().open();
    //descarga el pdf
    this.pdf.create().open()
  }

  async showPdf() {
    let docDefinition = {
      content: [
        {
          text: 'PDF Generated with Image from external URL',
          fontSize : 20
        },
        {
          image: await this.getBase64ImageFromURL(
            "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300"
          )
        }        
      ]
    };
    pdfMaker.createPdf(docDefinition).open();
  }

  crearpdf(){
    var dd = {
      content: [
        {
          text: 'CONVOCATORIA DEPARTAMENTO DE SISTEMAS E INFORMATICA\n\n',
          style: 'header',
          alignment: 'center'
        },
        {
          text: [
            {text: 'Nombres:', fontSize: 15, bold: true},' Juancito\n\n',
            {text: 'Apellidos:', fontSize: 15, bold: true},' Perez\n\n',
            'control over it. \nEach inline can be ',
            {text: 'styled ', fontSize: 20},
            {text: 'independently ', italics: true, fontSize: 40},
            'then.\n\n'
          ]
        },
        {text: 'Mixing named styles and style-overrides', style: 'header'},
        {
          style: 'bigger',
          italics: false,
          text: [
            'We can also mix named-styles and style-overrides at both paragraph and inline level. ',
            'For example, this paragraph uses the "bigger" style, which changes fontSize to 15 and sets italics to true. ',
            'Texts are not italics though. It\'s because we\'ve overriden italics back to false at ',
            'the paragraph level. \n\n',
            'We can also change the style of a single inline. Let\'s use a named style called header: ',
            {text: 'like here.\n', style: 'header'},
            'It got bigger and bold.\n\n',
            'OK, now we\'re going to mix named styles and style-overrides at the inline level. ',
            'We\'ll use header style (it makes texts bigger and bold), but we\'ll override ',
            'bold back to false: ',
            {text: 'wow! it works!', style: 'header', bold: false},
            '\n\nMake sure to take a look into the sources to understand what\'s going on here.'
          ]
        },
        'and opacity is supported:',
		{
			image: 'assets/img/logoUmss.png',
			width: 150,
			opacity: 0.5
		},
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      } 
    }
    var pdf2 = pdfMaker.createPdf(dd).open();
  }
}
