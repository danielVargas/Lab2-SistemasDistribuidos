import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Random;
import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.net.ssl.HttpsURLConnection;


public class Server {

    private final String USER_AGENT = "Mozilla/5.0";
 

    public static double []  bubbleSort(double[] arr) {
          boolean swapped = true;
          int j = 0;
          double tmp;
          while (swapped) {
                swapped = false;
                j++;
                for (int i = 0; i < arr.length - j; i++) {                                       
                      if (arr[i] > arr[i + 1]) {                          
                            tmp = arr[i];
                            arr[i] = arr[i + 1];
                            arr[i + 1] = tmp;
                            swapped = true;
                      }
                }                
          }
          return arr;
    }


    public static double [] quicksort(double A[], int izq, int der) {

      double pivote=A[izq]; // tomamos primer elemento como pivote
      int i=izq; // i realiza la búsqueda de izquierda a derecha
      int j=der; // j realiza la búsqueda de derecha a izquierda
      double aux;
     
      while(i<j){            // mientras no se crucen las búsquedas
         while(A[i]<=pivote && i<j) i++; // busca elemento mayor que pivote
         while(A[j]>pivote) j--;         // busca elemento menor que pivote
         if (i<j) {                      // si no se han cruzado                      
             aux= A[i];                  // los intercambia
             A[i]=A[j];
             A[j]=aux;
         }
       }
       A[izq]=A[j]; // se coloca el pivote en su lugar de forma que tendremos
       A[j]=pivote; // los menores a su izquierda y los mayores a su derecha
       if(izq<j-1)
          quicksort(A,izq,j-1); // ordenamos subarray izquierdo
       if(j+1 <der)
          quicksort(A,j+1,der); // ordenamos subarray derecho

      return A;
}


  public static void main(String args[]) throws Exception{
     
    Server http = new Server();
 
        System.out.println("Testing 1 - Send Http GET request");
        http.sendGet(); 

    }
      // HTTP GET request
    private void sendGet() throws Exception {
 
        String url = "http://localhost:3000/part/1";
       // String tweet = "2";

        //url = url.concat(tweet);
 
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
 
        //Otional default is GET
        con.setRequestMethod("GET");
    
        //Add request header
        con.setRequestProperty("User-Agent", USER_AGENT);
 
        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);
 
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
 
        while ((inputLine = in.readLine()) != null) {

            response.append(inputLine);
        }
        in.close();
        String str = response.toString();
        str = str.replace("[", "");
        str = str.replace("]", "");
        str = str.replace("\"", "");
        String [] arreglo =  str.split(",");
        double [] arregloFinal = new double[arreglo.length];

        for (int i = 0 ; i< arreglo.length; i++) {

            arregloFinal[i] = Double.parseDouble(arreglo[i]);
        }
        System.out.println("");
        System.out.println("Quicksort: ");
        arregloFinal=quicksort(arregloFinal,0,arregloFinal.length-1);
         for (int i = 0; i < arregloFinal.length; i++) {
            System.out.print(""+arregloFinal[i]+" ");
        }
       
 
    }

}


