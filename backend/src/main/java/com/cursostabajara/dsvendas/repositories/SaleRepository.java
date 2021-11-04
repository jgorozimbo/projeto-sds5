package com.cursostabajara.dsvendas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cursostabajara.dsvendas.dto.SaleSuccessDTO;
import com.cursostabajara.dsvendas.dto.SaleSumDTO;
import com.cursostabajara.dsvendas.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{
	
	@Query("SELECT new com.cursostabajara.dsvendas.dto.SaleSumDTO(obj.seller, SUM(obj.amount))" +
			" FROM Sale as obj GROUP BY obj.seller")
	List<SaleSumDTO> amountGroupedBySeller();

	@Query("SELECT new com.cursostabajara.dsvendas.dto.SaleSuccessDTO(obj.seller, SUM(obj.visited), SUM(obj.deals))" +
			" FROM Sale as obj GROUP BY obj.seller")
	List<SaleSuccessDTO> successGroupedBySeller();
}
