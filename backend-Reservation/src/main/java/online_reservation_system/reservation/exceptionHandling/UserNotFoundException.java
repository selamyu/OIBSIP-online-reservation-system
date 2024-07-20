package online_reservation_system.reservation.exceptionHandling;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message){
        super(message);
    }
}
