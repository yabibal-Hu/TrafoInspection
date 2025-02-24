export interface inspection {
  comments?: string;
  inspection_date?: string;
  transformer_name?: string;
  username?: string;
  weather?: string;
  temperature?: string;
  transformer_temp?: string;
  left_green_line_temp?: string;
  left_yellow_line_temp?: string;
  left_red_line_temp?: string;
  left_blue_line_temp?: string;
  right_green_line_temp?: string;
  right_yellow_line_temp?: string;
  right_red_line_temp?: string;
  right_blue_line_temp?: string;
  line_temp_under_the_base?: string;
}

export interface singleInspection {
  hours: string;
  weather: string;
  temperature: string;
}
