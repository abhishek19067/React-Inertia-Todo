<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        schema::create('jobs', function (Blueprint $table) {    $table->id();    $table->string('queue', 191)->index(); 
            $table->longText('payload');  
            $table->unsignedTinyInteger('attempts')->default(0);   
            $table->timestamp('reserved_at')->nullable(); 
            $table->timestamp('available_at'); 
            $table->timestamp('created_at')->useCurrent();});
    

        // Create job_batches table
        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id', 191)->primary();  // Limit the length of id to 191 characters
            $table->string('name');
            $table->integer('total_jobs')->default(0);
            $table->integer('pending_jobs')->default(0);
            $table->integer('failed_jobs')->default(0);
            $table->longText('failed_job_ids')->nullable();
            $table->mediumText('options')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('finished_at')->nullable();
        });

        // Create failed_jobs table
        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid',191)->unique();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
    }
};
