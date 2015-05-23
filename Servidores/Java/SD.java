
package sd_java;


import java.util.Random;

/**
 *
 * @author Matias
 */
public class SD {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        float[] vector=new float[20];
        float[] vector2=new float[20];
        float[] vector3=new float[20];
        Random rm = new Random();
        for (int i = 0; i < vector.length; i++) {
            vector[i]= rm.nextFloat();
            vector2[i]= rm.nextFloat();
            vector3[i]= rm.nextFloat();
        }
    
        //MERGE
        vector = mergeSort(vector);
        System.out.println("Merge:");
        for (int i = 0; i < vector.length; i++) {
            System.out.print(""+vector[i]+" ");
        }
        System.out.println("");
        //BUBBLESORT
        vector2= bublesort(vector2);
        System.out.println("Bublesort: ");
        for (int i = 0; i < vector.length; i++) {
            System.out.print(""+vector2[i]+" ");
        }
        System.out.println("");
        System.out.println("Quicksort: ");
        vector3=quicksort(vector3,0,vector3.length-1);
         for (int i = 0; i < vector.length; i++) {
            System.out.print(""+vector3[i]+" ");
        }
       
    
    
            
            
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }
    
    /*MERGE*/
    /*http://stackoverflow.com/questions/1735863/merge-sort-java*/
    private static float[] mergeSort(float[] input){
    if (input.length == 1)
        return input;

    int length = input.length/2;
    float[] left = new float[length];
    float[] right = new float[input.length - length];

    for (int i = 0; i < length; i++)
        left[i] = input[i];
    for (int i = length; i < input.length; i++)
        right[i-length] = input[i];

    return merge(mergeSort(left),mergeSort(right));
}

private static float[] merge(float[] left, float[] right){
    float[] merged = new float[left.length+right.length];
    int lengthLeft = left.length;
    int lengthRight = right.length;
    while (lengthLeft > 0 && lengthRight > 0){
        if (left[left.length - lengthLeft] < right[right.length - lengthRight]){
            merged[merged.length -lengthLeft-lengthRight] = left[left.length - lengthLeft];
            lengthLeft--;
        }else{
            merged[merged.length - lengthLeft-lengthRight] = right[right.length - lengthRight];
            lengthRight--;
        }
    }
    while (lengthLeft > 0){
        merged[merged.length - lengthLeft] = left[left.length-lengthLeft];
        lengthLeft--;
    }
    while (lengthRight > 0){
        merged[merged.length - lengthRight] = right[right.length-lengthRight];
        lengthRight--;
    }
    return merged;
}
    
/*BUBBLESORT*/
    private static float [] bublesort (float[] list) {

        boolean swap = true;
        float temp;
        while(swap){
            swap = false;
            for(int i = 0;i<list.length-1;i++){


                if(list[i] > list[i+1]){
                    temp = list[i];
                    list[i] = list[i+1];
                    list[i+1] = temp;                   
                    swap = true;
                }
            }
        }

        return list;

    }

    /*QUICKSORT*/
    /*http://stackoverflow.com/questions/14907334/stackoverflow-with-quicksort-java-implementation*/
    
     private static float[] quicksort(float[] A, int left, int right) {
        float pivot = A[left + (right - left) / 2];
        int i = left;
        int j = right;
        while (i <= j) {
            while (A[i] < pivot) {
                i++;
            }
            while (A[j] > pivot) {
                j--;
            }
            if (i <= j) {
                exchange(A,i, j);
                i++;
                j--;
            }
        }

        if(left < j)
            A=quicksort(A,left,j);
        if(i < right)
            A=quicksort(A,i,right);
        return A;
     }

   private static float[] exchange(float A[],int i, int j){
        float temp=A[i];
        A[i]=A[j];
        A[j]=temp;
        return A;
    }

    
    
    
    
    
    
    
}

