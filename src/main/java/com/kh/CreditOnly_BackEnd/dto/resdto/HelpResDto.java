package com.kh.CreditOnly_BackEnd.dto.resdto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HelpResDto {
    private Long id;
    private String title;
    private String contents;
    private String createdDate;
}
