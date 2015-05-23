import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;



public class Server {

  protected void start() {
    ServerSocket s;
    String gets = "";
    System.out.println("Start on port 8088");
    try {
      // create the main server socket
      s = new ServerSocket(8088);
    } catch (Exception e) {
      System.out.println("Error: " + e);
      return;
    }

    System.out.println("Waiting for connection");
    for (;;) {
      try {
        // wait for a connection
        Socket remote = s.accept();
        // remote is now the connected socket
        System.out.println("Connection, sending data.");
        BufferedReader in = new BufferedReader(new InputStreamReader(
            remote.getReader()));
        PrintWriter out = new PrintWriter(remote.getOutputStream());


    
        String str = ".";

        while (!str.equals("")) {
          str = in.readLine();
          System.out.println(str);
          if (str.contains("GET")){
            gets = str;
            break;
          }
        }

        out.println("HTTP/1.0 200 OK");
        out.println("Content-Type: text/html");
        out.println("");
        // Send the HTML page
        String method = "get";
        out.print("<html><form method="+method+">");
        out.print("<textarea name=we></textarea></br>");
        out.print("<input type=text name=a><input type=submit></form></html>");
        out.println(gets);
        out.flush();

        remote.close();
      } catch (Exception e) {
        System.out.println("Error: " + e);
      }
    }
  }

  public static void main(String args[]) {
    Server ws = new Server();
    ws.start();
  }
}



/*import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
 
import javax.net.ssl.HttpsURLConnection;
 
public class Server {
 
    private final String USER_AGENT = "Mozilla/5.0";
 
    public static void main(String[] args) throws Exception {
 
        Server http = new Server();
 
        System.out.println("Testing 1 - Send Http GET request");
        http.sendGet(); 
    }
 
    // HTTP GET request
    private void sendGet() throws Exception {
 
        String url = "http://localhost:3000/cargarInput/";
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

        System.out.println(response.toString());
 
    }
 
}
*/