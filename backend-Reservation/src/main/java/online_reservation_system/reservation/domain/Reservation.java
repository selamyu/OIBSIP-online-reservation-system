package online_reservation_system.reservation.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private Long userId;
    private String trainNumber;
    private String trainName;
    private String classType;
    @Temporal(TemporalType.DATE)
    private Date dateOfJourney;

    @Temporal(TemporalType.TIME)
    private Time timeOfJourney;
    @NotBlank
    private String origin;
    @NotBlank
    private String destination;
}
